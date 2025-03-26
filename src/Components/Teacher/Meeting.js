import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Button, Modal, InputGroup, FormControl, Alert } from 'react-bootstrap';
import TeacherHeader from './TeacherHeader';
import TeacherSidePannel from './TeacherSidepannel';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateMeeting = () => {
  const apiKey = 'AIzaSyA_7IDmGelq0zbqnGpZkIoBgH0pUPVlVyA';
  const clientId = '689086187609-2h4nagfqdjt11r3ub1kt322mr4gmmnrl.apps.googleusercontent.com';

  const tokenClient = useRef(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 1024);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const [meetingData, setMeetingData] = useState({
    name: '',
    description: '',
    level: '0',
    date: '',
    startTime: '',
    endTime: '',
    attendees: '',
  });
  const [isCreatingMeeting, setIsCreatingMeeting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [meetingLink, setMeetingLink] = useState('');
  const [showSignInAlert, setShowSignInAlert] = useState(false);

  // Script Loading Effect
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

  // Initialize GAPI Client
  const initializeGapiClient = async () => {
    try {
      await new Promise((resolve, reject) => {
        window.gapi.load('client', { callback: resolve, onerror: reject });
      });
      
      await window.gapi.client.init({
        apiKey: apiKey,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      });

      // Initialize token client
      tokenClient.current = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
        callback: handleTokenResponse
      });

      setIsApiLoaded(true);
      console.log('GAPI client initialized successfully');
    } catch (error) {
      console.error('Error initializing GAPI client:', error);
    }
  };

  // Handle Token Response
  const handleTokenResponse = (response) => {
    if (response.error) {
      console.error('Token error:', response.error);
      return;
    }
    
    // Set signed in state
    setIsSignedIn(true);
    
    // Fetch user profile
    fetchUserProfile();
  };

  // Fetch User Profile
  const fetchUserProfile = async () => {
    try {
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

  // Handle Sign In
  const handleSignIn = () => {
    if (tokenClient.current) {
      // Request a token with appropriate scopes
      tokenClient.current.requestAccessToken({prompt: 'consent'});
    } else {
      console.error('Token client not initialized');
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeetingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Schedule Meeting
  const scheduleMeeting = async () => {
    // First, check if user is signed in
    if (!isSignedIn) {
      setShowSignInAlert(true);
      return;
    }

    setIsCreatingMeeting(true);
    
    try {
      // Combine date and times
      const startDateTime = new Date(`${meetingData.date}T${meetingData.startTime}`);
      const endDateTime = new Date(`${meetingData.date}T${meetingData.endTime}`);
      
      // Make sure Calendar API is loaded
      if (!window.gapi.client.calendar) {
        await window.gapi.client.load('calendar', 'v3');
      }
      
      // Parse attendees
      const attendeesList = meetingData.attendees.split(',').map(email => {
        return { email: email.trim() };
      }).filter(attendee => attendee.email);
      
      // Define meeting event
      const event = {
        summary: meetingData.name,
        description: meetingData.description,
        start: {
          dateTime: startDateTime.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        end: {
          dateTime: endDateTime.toISOString(),
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
        sendUpdates: 'all'
      });

      // Extract meeting link
      const conferenceData = response.result.conferenceData;
      if (conferenceData && conferenceData.entryPoints) {
        const meetEntry = conferenceData.entryPoints.find(entry => entry.entryPointType === 'video');
        if (meetEntry) {
          const meetLink = meetEntry.uri;
          setMeetingLink(meetLink);
          setShowPopup(true);
        } else {
          alert('Meeting created but no video link was generated.');
        }
      }

      // Reset form
      setMeetingData({
        name: '',
        description: '',
        level: '0',
        date: '',
        startTime: '',
        endTime: '',
        attendees: '',
      });
    } catch (error) {
      console.error('Error scheduling meeting:', error);
      alert(`Failed to schedule meeting: ${error.message || 'Unknown error'}`);
    } finally {
      setIsCreatingMeeting(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    scheduleMeeting();
  };

  // Copy meeting link
  const handleCopy = () => {
    navigator.clipboard.writeText(meetingLink);
  };

  return (
    <div>
      {/* Sign-in Alert */}
      {showSignInAlert && (
        <Alert 
          variant="warning" 
          onClose={() => setShowSignInAlert(false)} 
          dismissible
        >
          <Alert.Heading>Please Sign In</Alert.Heading>
          <p>
            You need to sign in with Google before creating a meeting. 
            <Button 
              variant="primary" 
              onClick={handleSignIn} 
              className="ml-2"
            >
              Sign In
            </Button>
          </p>
        </Alert>
      )}

      <TeacherHeader toggleSidebar={() => setIsSidebarVisible(!isSidebarVisible)} />
      <div className="d-flex">
        {isSidebarVisible && <TeacherSidePannel />}
        <Container className="main-container mt-4">
          <div className="sticky-header">
            <Row style={{paddingTop:'15px'}}>
              <Col>
                <h2 className="fw-bold">Create Meeting</h2>
                {isSignedIn && (
                  <p>Signed in as: {userName} ({userEmail})</p>
                )}
              </Col>
            </Row>
          </div>
         
          <div className="sub-container">
            <Form onSubmit={handleSubmit}>
              {/* Form fields remain the same as in previous version */}
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="name" 
                    value={meetingData.name} 
                    onChange={handleChange} 
                    placeholder="Enter meeting name" 
                    required 
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="description" 
                    value={meetingData.description} 
                    onChange={handleChange} 
                    placeholder="Enter description" 
                    required 
                  />
                </Col>
                <Col md={6} className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control 
                  type="date" 
                  name="date" 
                  value={meetingData.date} 
                  onChange={handleChange} 
                  required 
                />
              </Col>
            </Row>
            <Row>
              <Col md={4} className="mb-3">
                <Form.Label>Time</Form.Label>
                <Form.Control 
                  type="time" 
                  name="time" 
                  value={meetingData.time} 
                  onChange={handleChange} 
                  required 
                />
              </Col>
              <Col md={4} className="mb-3">
                <Form.Label>Start Time</Form.Label>
                <Form.Control 
                  type="time" 
                  name="startTime" 
                  value={meetingData.startTime} 
                  onChange={handleChange} 
                  required 
                />
              </Col>
              <Col md={4} className="mb-3">
                <Form.Label>End Time</Form.Label>
                <Form.Control 
                  type="time" 
                  name="endTime" 
                  value={meetingData.endTime} 
                  onChange={handleChange} 
                  required 
                />
              </Col>
              </Row>
              {/* Rest of the form remains the same */}
              <Button 
                variant="primary" 
                type="submit" 
                disabled={isCreatingMeeting || !isSignedIn}
              >
                {isCreatingMeeting ? 'Creating...' : 'Create Meeting'}
              </Button>
              {!isSignedIn && (
                <Button 
                  variant="secondary" 
                  className="ml-2" 
                  onClick={handleSignIn}
                >
                  Sign In with Google
                </Button>
              )}
            </Form>

            {/* Meeting Link Modal */}
            <Modal show={showPopup} onHide={() => setShowPopup(false)} centered>
              <Modal.Header closeButton>
                <Modal.Title>Meeting Link</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <InputGroup className="d-flex">
                  <FormControl value={meetingLink} readOnly />
                  <Button variant="outline-secondary" onClick={handleCopy}>
                    Copy
                  </Button>
                </InputGroup>
              </Modal.Body>
            </Modal>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default CreateMeeting;