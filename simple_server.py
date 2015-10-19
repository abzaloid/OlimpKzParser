import sys
import BaseHTTPServer
from BaseHTTPServer import BaseHTTPRequestHandler
import urlparse
from SimpleHTTPServer import SimpleHTTPRequestHandler
import doall
import json

class GetHandler(BaseHTTPRequestHandler):
    
    def do_GET(self):
        parsed_path = urlparse.urlparse(self.path)
        response = ""
        date = []
        win = []
        lost = []
        message = parsed_path.query
        if len(message) < 20:
        	response = -1
        else:
	        login = message[6:12]
	        passw = message[19:]
	        (date, win, lost) = doall.run(login, passw)

        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        if response == "":
        	j = json.dumps({"date": date, 
        				"win": win,
        				"lost": lost,})
        	response = json.loads(j)
        self.wfile.write(response)
        return

# HandlerClass = SimpleHTTPRequestHandler
ServerClass  = BaseHTTPServer.HTTPServer
Protocol     = "HTTP/1.0"

server_address = ('127.0.0.1', port)

# HandlerClass.protocol_version = Protocol
httpd = ServerClass(server_address, GetHandler)

sa = httpd.socket.getsockname()
print "Serving HTTP on", sa[0], "port", sa[1], "..."



httpd.serve_forever()