var SERVER_HOST_PORT = process.env.REACT_APP_BACKEND_HOST || 'localhost:8080';
var WEB_PROTOCOL = process.env.REACT_APP_PROTOCOL || 'http';

class ClientConfig {
    static SERVER_LINK = WEB_PROTOCOL + '://' + SERVER_HOST_PORT;
}

export default ClientConfig;