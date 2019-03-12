#Names a server and declares the listening port
server {
  listen 80;
  server_name d20md.com;

  location /api {
      proxy_pass http://localhost:8000;
      proxy_set_header Host $host;
  }
}
