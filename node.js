const fs = require("fs");
const http = require("http");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const mysql = require('mysql');

const server = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "myfirstdb1",
    password: ""
});
const FolderFile  =  path.join(__dirname, '../Auto/AutoInformation/');
let information = "D";
let activate = 0;
let Ifelse = 0;
let fileName = 'A';
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '')));

let query = "SELECT * FROM users";

const site = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    const ext = path.extname(filePath);
    let contentType = 'text/html';

    switch (ext) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        default:
            contentType = 'text/html';
    }

    if (!ext) {
        filePath += '.html';
    }

    if (req.method === 'GET') {
        fs.readFile(filePath, (err, content) => {
            res.end(content);
        });
    }

    if (req.method === 'POST' && req.url === '/register') {
        let body = '';
        req.on('data', (data) => {
            body += data;
        });

        req.on('end', () => {
         
            const formData = new URLSearchParams(body.toString());
            const username = formData.get('username');
            const password = formData.get('password');

            server.query(query, (err, result, field) => {
              
               
                const size = result.length;
             
                for (let i = 0; i < size; i++) {
                    if (username === result[i]?.username && password === result[i]?.password) {
                        fileName = `${username}`;
                        fs.readFile(`${FolderFile}/${fileName}.txt`, 'utf-8', (err, data) => {
                            if (err) {
                                console.log("This file dont existing!");
                            } else {
                                information = data;
                               
                                console.log(data);
                            }
                           
                        });
                        Ifelse = Ifelse + 1;
                        console.log("Database ok");
                    } if(Ifelse == 0) {
                       
                        fileName = `A`;
                        fs.readFile(`${FolderFile}/${fileName}.txt`, 'utf-8', (err, data) => {
                            if (err) {
                                console.log("This file dont existing!");
                            } else {
                                information = data;
                               
                                console.log(data);
                            }
                          
                    });
                    console.log("error");
                }
            }
                
                const fileStream = fs.createReadStream(`${FolderFile}/${fileName}.txt`);
                res.setHeader('Content-disposition', `attachment; filename=${fileName}.txt`);
                res.setHeader('Content-type', 'application/octet-stream');
              
                res.writeHeader(200, { "Content-Type": "text/html" });

               

                if (activate === 0) {
                    res.end(`<form action="/download" method="post">
                        <input type="submit" value="Скачати">
                    </form>`);
                } else if(activate === 1) {
                    res.end(`${information}`);
                    activate = 0;
                }
              activate++;
                 if(activate == 1)
                 {
                fileStream.pipe(res);
                 }
                 Ifelse = 0;
                
                });
            
        });
    }
});

site.listen(5000);