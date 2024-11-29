'use strict';

const { google } = require('googleapis');
const calendar = google.calendar('v3');
const SCOPES = [
  'https://www.googleapis.com/auth/calendar.events.public.readonly',
];
const { CLIENT_ID, CLIENT_SECRET, CALENDAR_ID } = process.env;

const redirects_uris = ['https://kittykatkaro.github.io/meet/'];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirects_uris[0]
);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

module.exports.getAuthURL = async () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: corsHeaders,
    body: JSON.stringify({
      authUrl,
    }),
  };
};

module.exports.getAccessToken = async (event) => {
  const code = decodeURIComponent(`${event.pathParameters.code}`);

  return new Promise((resolve, reject) => {
    oAuth2Client.getToken(code, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response);
    });
  })
    .then((results) => {
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify(results),
      };
    })
    .catch((error) => {
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify(error),
      };
    });
};

module.exports.getCalendarEvents = async (event) => {
  try {
    const access_token = decodeURIComponent(
      `${event.pathParameters.access_token}`
    );
    oAuth2Client.setCredentials({ access_token });

    const response = await new Promise((resolve, reject) => {
      calendar.events.list(
        {
          calendarId: CALENDAR_ID,
          auth: oAuth2Client,
          timeMin: new Date().toISOString(),
          singleEvents: true,
          orderBy: 'startTime',
        },
        (error, response) => (error ? reject(error) : resolve(response))
      );
    });

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ events: response.data.items }),
    };
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Failed to fetch events' }),
    };
  }
};
