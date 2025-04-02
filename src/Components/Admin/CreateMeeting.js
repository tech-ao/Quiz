import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Modal, InputGroup, FormControl, Alert } from 'react-bootstrap';
import Sidebar from "./SidePannel";
import AdminHeader from "./AdminHeader";
import 'bootstrap/dist/css/bootstrap.min.css';

const Createmeeting = () => {
  const apiKey = 'AIzaSyA_7IDmGelq0zbqnGpZkIoBgH0pUPVlVyA';
  const clientId = '689086187609-2h4nagfqdjt11r3ub1kt322mr4gmmnrl.apps.googleusercontent.com';
  const API_ENDPOINT = 'http://srimathicare.in:8081/api/Classess/Create';

  const tokenClient = useRef(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 1024);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const [meetingData, setMeetingData] = useState({
    name: '',
    description: '',
    meetingType: 'instant', 
    date: '',
    startTime: '',
    endTime: '',
    participants: '', 
  });
  const [isCreatingMeeting, setIsCreatingMeeting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [meetingLink, setMeetingLink] = useState('');
  const [showSignInAlert, setShowSignInAlert] = useState(false);

   useEffect(() => {
      const handleResize = () => {
        setIsSidebarVisible(window.innerWidth >= 1024);
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

  useEffect(() => {
    const loadScripts = () => {
      const gisScript = document.createElement('script');
      gisScript.src = 'https://accounts.google.com/gsi/client';
      gisScript.async = true;
      gisScript.defer = true;
      gisScript.onload = () => {
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

  const initializeGapiClient = async () => {
    try {
      await new Promise((resolve, reject) => {
        window.gapi.load('client', { callback: resolve, onerror: reject });
      });
      
      await window.gapi.client.init({
        apiKey: apiKey,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      });

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

  const handleTokenResponse = (response) => {
    if (response.error) {
      console.error('Token error:', response.error);
      return;
    }
    
    setIsSignedIn(true);
    
    fetchUserProfile();
  };

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

  const handleSignIn = () => {
    if (tokenClient.current) {
      tokenClient.current.requestAccessToken({prompt: 'consent'});
    } else {
      console.error('Token client not initialized');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeetingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const scheduleMeeting = async () => {
    if (!isSignedIn) {
      setShowSignInAlert(true);
      return;
    }

    setIsCreatingMeeting(true);
    
    try {
      let startDateTime, endDateTime;
      if (meetingData.meetingType === 'instant') {
        const now = new Date();
        startDateTime = now;
        endDateTime = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour duration by default
      } else {
        startDateTime = new Date(`${meetingData.date}T${meetingData.startTime}`);
        endDateTime = new Date(`${meetingData.date}T${meetingData.endTime}`);
      }
      
      if (!window.gapi.client.calendar) {
        await window.gapi.client.load('calendar', 'v3');
      }
      
      const participantsList = meetingData.participants.split(',').map(email => {
        return { email: email.trim() };
      }).filter(participant => participant.email);
      
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
        attendees: participantsList,
        conferenceData: {
          createRequest: {
            requestId: `${Date.now()}-${Math.floor(Math.random() * 1000)}`
          }
        }
      };

      const response = await window.gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
        conferenceDataVersion: 1,
        sendUpdates: 'all'
      });

      const conferenceData = response.result.conferenceData;
      let meetLink = '';
      if (conferenceData && conferenceData.entryPoints) {
        const meetEntry = conferenceData.entryPoints.find(entry => entry.entryPointType === 'video');
        if (meetEntry) {
          meetLink = meetEntry.uri;
          setMeetingLink(meetLink);
        } else {
          alert('Meeting created but no video link was generated.');
          return;
        }
      }

      const apiPayload = {
        id: 0,
        name: meetingData.name,
        instructor: userName, 
        date: startDateTime.toISOString(),
        createdBy: 0, 
        time: meetingData.startTime,
        meetingLink: meetLink,
        studentIds: [],
        createdFrom: 0,
        timeStamp: new Date().toISOString(),
        isDeleted: false,
        objectId: `meeting-${Date.now()}`
      };

      const apiResponse = await axios.post(API_ENDPOINT, apiPayload, {
        headers: {
          'accept': 'text/plain',
          'Content-Type': 'application/json',
          "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",

        }
      });

      if (apiResponse.status === 200 || apiResponse.status === 201) {
        console.log('Meeting stored in database successfully', apiResponse.data);
        setShowPopup(true);
      }

      // Reset form
      setMeetingData({
        name: '',
        description: '',
        meetingType: 'instant',
        date: '',
        startTime: '',
        endTime: '',
        participants: '',
      });
    } catch (error) {
      console.error('Error in meeting process:', error);
      
      if (error.response) {
        alert(`Failed to store meeting: ${error.response.data || 'Unknown error'}`);
      } else if (error.message) {
        alert(`Error: ${error.message}`);
      } else {
        alert('An unexpected error occurred');
      }
    } finally {
      setIsCreatingMeeting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    scheduleMeeting();
  };

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

<AdminHeader toggleSidebar={() => setIsSidebarVisible((prev) => !prev)} />
      <div className="d-flex">
        {isSidebarVisible && <Sidebar />}
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
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label>Meeting Type</Form.Label>
                  <Form.Control 
                    as="select"
                    name="meetingType"
                    value={meetingData.meetingType}
                    onChange={handleChange}
                  >
                    <option value="instant">Instant Meeting</option>
                    <option value="scheduled">Scheduled Meeting</option>
                  </Form.Control>
                </Col>
                {meetingData.meetingType === 'scheduled' && (
                  <>
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
                    <Col md={6} className="mb-3">
                      <Form.Label>Start Time</Form.Label>
                      <Form.Control 
                        type="time" 
                        name="startTime" 
                        value={meetingData.startTime} 
                        onChange={handleChange} 
                        required 
                      />
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Label>End Time</Form.Label>
                      <Form.Control 
                        type="time" 
                        name="endTime" 
                        value={meetingData.endTime} 
                        onChange={handleChange} 
                        required 
                      />
                    </Col>
                  </>
                )}
                <Col md={12} className="mb-3">
                  <Form.Label>Participants (comma-separated emails)</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="participants" 
                    value={meetingData.participants} 
                    onChange={handleChange} 
                    placeholder="Enter participant emails" 
                    required 
                  />
                </Col>
              </Row>
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

export default Createmeeting;