import React, { useEffect, useState, useRef } from 'react';

const GoogleMeetCreator = () => {
  // API credentials - store securely in environment variables
  const apiKey = 'AIzaSyA_7IDmGelq0zbqnGpZkIoBgH0pUPVlVyA';
  const clientId = '689086187609-2h4nagfqdjt11r3ub1kt322mr4gmmnrl.apps.googleusercontent.com';
  
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const [isCreatingMeeting, setIsCreatingMeeting] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [attendees, setAttendees] = useState('');
  const [meetingTitle, setMeetingTitle] = useState('New Meeting');
  const [meetingDescription, setMeetingDescription] = useState('');
  const [startDateTime, setStartDateTime] = useState("");
  const [duration, setDuration] = useState(30); // Default duration in minutes
  const [endDateTime, setEndDateTime] = useState('');
  const [createdMeetings, setCreatedMeetings] = useState([]);

  
  const tokenClient = useRef(null);

  useEffect(() => {
    const now = new Date();
    const nearestHour = new Date(now);
    nearestHour.setHours(now.getHours(), now.getMinutes(), 0, 0);

    setStartDateTime(nearestHour.toISOString().slice(0, 16));
  }, []);

  // Load Google API libraries
  useEffect(() => {
    const loadScripts = () => {
      // Load the GIS library first
      const gisScript = document.createElement('script');
      gisScript.src = 'https://accounts.google.com/gsi/client';
      gisScript.async = true;
      gisScript.defer = true;
      gisScript.onload = () => {
        // Then load GAPI
        const gapiScript = document.createElement('script');
        gapiScript.src = 'https://apis.google.com/js/api.js';
        gapiScript.async = true;
        gapiScript.defer = true;
        gapiScript.onload = () => {
          initializeGapiClient();
        };
        document.body.appendChild(gapiScript);
      };
      document.body.appendChild(gisScript);
    };

    loadScripts();
  }, []);

  // Initialize the GAPI client
  const initializeGapiClient = async () => {
    try {
      await new Promise((resolve, reject) => {
        window.gapi.load('client', { callback: resolve, onerror: reject });
      });
      
      await window.gapi.client.init({
        apiKey: apiKey,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      });

      // Initialize token client after GAPI is loaded
      initializeTokenClient();
      setIsApiLoaded(true);
      console.log('GAPI client initialized successfully');
    } catch (error) {
      console.error('Error initializing GAPI client:', error);
    }
  };

  // Initialize Google Identity Services token client
  const initializeTokenClient = () => {
    tokenClient.current = window.google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
      callback: (tokenResponse) => {
        if (tokenResponse && tokenResponse.access_token) {
          console.log("Token received:", tokenResponse.access_token.substring(0, 10) + "...");
          // Set the token for GAPI requests
          window.gapi.client.setToken(tokenResponse);
          setIsSignedIn(true);
          fetchUserProfile();
        }
      },
      error_callback: (error) => {
        console.error('Token client error:', error);
        setIsSignedIn(false);
      }
    });
  };

  // Get user profile information
  const fetchUserProfile = async () => {
    try {
      // Make a request to the userinfo endpoint with the current token
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          'Authorization': `Bearer ${window.gapi.client.getToken().access_token}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Profile fetch failed: ${response.status} ${response.statusText}`);
      }
      
      const profile = await response.json();
      setUserName(profile.name || profile.given_name);
      setUserEmail(profile.email);
      console.log('User profile loaded:', profile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  // Handle sign-in
  const handleSignIn = () => {
    if (tokenClient.current) {
      // Request a token with appropriate scopes
      tokenClient.current.requestAccessToken({prompt: 'consent'});
    } else {
      console.error('Token client not initialized');
    }
  };

  // Handle sign-out
  const handleSignOut = () => {
    // Revoke token
    const token = window.gapi.client.getToken();
    if (token) {
      window.google.accounts.oauth2.revoke(token.access_token, () => {
        window.gapi.client.setToken(null);
        setIsSignedIn(false);
        setUserName('');
        setUserEmail('');
        setCreatedMeetings([]);
      });
    }
  };

  // Create an instant meeting
  const createInstantMeeting = async () => {
    setIsCreatingMeeting(true);
    
    try {
      // Make sure Calendar API is loaded
      if (!window.gapi.client.calendar) {
        await window.gapi.client.load('calendar', 'v3');
      }
      
      // Define meeting event with conferencing data
      const event = {
        summary: 'Instant Meeting',
        description: 'Instantly created meeting',
        start: {
          dateTime: new Date().toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        end: {
          dateTime: new Date(Date.now() + (duration * 60000)).toISOString(), // Default duration
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        conferenceData: {
          createRequest: {
            requestId: `${Date.now()}-${Math.floor(Math.random() * 1000)}`
          }
        }
      };

      // Create the event
      const response = await window.gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
        conferenceDataVersion: 1
      });

      // Extract meeting information
      const conferenceData = response.result.conferenceData;
      if (conferenceData && conferenceData.entryPoints) {
        const meetEntry = conferenceData.entryPoints.find(entry => entry.entryPointType === 'video');
        if (meetEntry) {
          const meetLink = meetEntry.uri;
          // Extract meeting code from URL
          const code = meetLink.split('/').pop();
          console.log('Created instant meeting with code:', code);
          
          const newMeeting = {
            id: response.result.id,
            title: 'Instant Meeting',
            link: meetLink,
            code: code,
            time: new Date().toLocaleString(),
            type: 'instant'
          };
          
          setCreatedMeetings(prev => [newMeeting, ...prev]);
        } else {
          console.error('No video entry point found in conference data');
        }
      } else {
        console.error('No conference data returned:', response.result);
      }
    } catch (error) {
      console.error('Error creating instant meeting:', error);
      alert('Failed to create meeting. Please check console for details.');
    } finally {
      setIsCreatingMeeting(false);
    }
  };

  // Schedule a meeting
  const scheduleMeeting = async () => {
    setIsCreatingMeeting(true);
    
    try {
      // Make sure Calendar API is loaded
      if (!window.gapi.client.calendar) {
        await window.gapi.client.load('calendar', 'v3');
      }
      
      // Parse attendees into the format required by Google Calendar API
      const attendeesList = attendees.split(',').map(email => {
        return { email: email.trim() };
      }).filter(attendee => attendee.email);
      
      // Convert start and end times to ISO strings
      const startTime = new Date(startDateTime).toISOString();
      const endTime = new Date(endDateTime).toISOString();
      
      // Define meeting event with conferencing data
      const event = {
        summary: meetingTitle,
        description: meetingDescription,
        start: {
          dateTime: startTime,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        end: {
          dateTime: endTime,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        attendees: attendeesList,
        conferenceData: {
          createRequest: {
            requestId: `${Date.now()}-${Math.floor(Math.random() * 1000)}`
          }
        }
      };

      // Create the event
      const response = await window.gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
        conferenceDataVersion: 1,
        sendUpdates: 'all' // Send invites to attendees
      });

      // Extract meeting information
      const conferenceData = response.result.conferenceData;
      if (conferenceData && conferenceData.entryPoints) {
        const meetEntry = conferenceData.entryPoints.find(entry => entry.entryPointType === 'video');
        if (meetEntry) {
          const meetLink = meetEntry.uri;
          // Extract meeting code from URL
          const code = meetLink.split('/').pop();
          
          const newMeeting = {
            id: response.result.id,
            title: meetingTitle,
            link: meetLink,
            code: code,
            time: new Date(startDateTime).toLocaleString(),
            attendees: attendees,
            type: 'scheduled'
          };
          
          setCreatedMeetings(prev => [newMeeting, ...prev]);
          
          // Reset the form
          setMeetingTitle('New Meeting');
          setMeetingDescription('');
          setAttendees('');
          setShowScheduleForm(false);
        } else {
          console.error('No video entry point found in conference data');
          alert('Meeting created but no video link was generated.');
        }
      } else {
        console.error('No conference data returned:', response.result);
        alert('Meeting scheduled but no conference data was returned.');
      }
    } catch (error) {
      console.error('Error scheduling meeting:', error);
      alert(`Failed to schedule meeting: ${error.message || 'Unknown error'}`);
    } finally {
      setIsCreatingMeeting(false);
    }
  };

  // Copy meeting link to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Meeting link copied to clipboard!');
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  };



  // Toggle the schedule form
  const toggleScheduleForm = () => {
    setShowScheduleForm(!showScheduleForm);
  };

  return (
    <div className="google-meet-container p-6 max-w-4xl mx-auto">
      {!isApiLoaded ? (
        <div className="loading text-center p-4">
          <p className="text-lg">Loading Google Calendar API...</p>
        </div>
      ) : !isSignedIn ? (
        <div className="signin-section bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">Google Meet Creator</h2>
          <p className="mb-6">Please sign in with your Google account to create meetings</p>
          <button 
            onClick={handleSignIn} 
            className="signin-button bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md transition"
          >
            Sign in with Google
          </button>
        </div>
      ) : (
        <div className="meeting-section bg-white rounded-lg shadow-md">
          <div className="user-info p-4 border-b border-gray-200 flex justify-between items-center">
            <p className="text-gray-700">
              Signed in as: <span className="font-medium">{userName || 'User'}</span> 
              {userEmail && <span className="ml-1">({userEmail})</span>}
            </p>
            <button 
              onClick={handleSignOut} 
              className="signout-button bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-3 rounded text-sm transition"
            >
              Sign Out
            </button>
          </div>
          
          <div className="controls p-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-4">
              <button 
                onClick={createInstantMeeting} 
                className="create-button bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition w-full md:w-auto"
                disabled={isCreatingMeeting}
              >
                {isCreatingMeeting ? 'Creating...' : 'Create Instant Meeting'}
              </button>
              
              <button 
                onClick={toggleScheduleForm} 
                className="schedule-button bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded transition w-full md:w-auto"
              >
                {showScheduleForm ? 'Hide Schedule Form' : 'Schedule a Meeting'}
              </button>
            </div>
            
            {showScheduleForm && (
              <div className="schedule-form bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                <h3 className="text-lg font-medium mb-3">Schedule a Meeting</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Title</label>
                    <input
                      type="text"
                      value={meetingTitle}
                      onChange={(e) => setMeetingTitle(e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="Meeting Title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Attendees (comma separated)</label>
                    <input
                      type="text"
                      value={attendees}
                      onChange={(e) => setAttendees(e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="email1@example.com, email2@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date & Time</label>
                    <input
                      type="datetime-local"
                      value={startDateTime}
                      onChange={(e) => setStartDateTime(e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="45">45 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="90">1.5 hours</option>
                      <option value="120">2 hours</option>
                      <option value="180">3 hours</option>
                    </select>
                  </div>
                  
                  <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">End Date & Time</label>
  <input
    type="datetime-local"
    value={endDateTime}
    onChange={(e) => setEndDateTime(e.target.value)} 
    className="w-full p-2 border rounded"
  />
</div>

                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={meetingDescription}
                      onChange={(e) => setMeetingDescription(e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="Meeting Description"
                      rows="3"
                    />
                  </div>
                </div>
                
                <button 
                  onClick={scheduleMeeting} 
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded transition"
                  disabled={isCreatingMeeting}
                >
                  {isCreatingMeeting ? 'Scheduling...' : 'Schedule Meeting'}
                </button>
              </div>
            )}
          </div>
          
          <div className="meetings-list p-4">
            <h3 className="text-lg font-medium mb-3">Created Meetings</h3>
            
            {createdMeetings.length === 0 ? (
              <p className="text-gray-500">No meetings created yet. Create an instant meeting or schedule one.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="p-2 border text-left">Type</th>
                      <th className="p-2 border text-left">Title</th>
                      <th className="p-2 border text-left">Time</th>
                      <th className="p-2 border text-left">Meeting Code</th>
                      <th className="p-2 border text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {createdMeetings.map((meeting) => (
                      <tr key={meeting.id}>
                        <td className="p-2 border">
                          <span className={`inline-block px-2 py-1 rounded text-xs ${meeting.type === 'instant' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                            {meeting.type === 'instant' ? 'Instant' : 'Scheduled'}
                          </span>
                        </td>
                        <td className="p-2 border">{meeting.title}</td>
                        <td className="p-2 border">{meeting.time}</td>
                        <td className="p-2 border font-mono">{meeting.code}</td>
                        <td className="p-2 border">
                          <button 
                            onClick={() => copyToClipboard(meeting.link)}
                            className="text-sm bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
                          >
                            Copy Link
                          </button>
                          <a 
                            href={meeting.link} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded ml-2"
                          >
                            Open
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleMeetCreator;