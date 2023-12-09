const express = require('express');
const bodyParser = require('body-parser');
const http = require('http')
const app = express();
const path = require('path')
const mysql = require('mysql')
const fs = require('fs')
let a = 39;
const server = mysql.createConnection( {
     host: "127.0.0.1",
     user: "root",
     database: "myfirstdb1",
     password: ""
})
const FolderFil  =  path.join(__dirname, '../Auto/AutoInformation/');
// Розпарсити дані типу application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  // Повернути HTML-форму для реєстрації
  res.sendFile(__dirname + '/Reg.html');
});

app.post('/register', (req, res) => {
  // Отримати дані з форми
  const username = req.body.username;
  const password = req.body.password;

  // Обробити отримані дані, наприклад, зберегти в базу даних
  
  const CreateTable =
    `
    INSERT INTO users (username, email) VALUES (?, ?)
    )`;
const insertDataQuery = `
INSERT INTO users (username, password) VALUES (?, ?)
`;

  
    
      console.log('Table "users" created successfully');
    
  server.query(insertDataQuery, [username, password], (insertError, insertResults, insertFields) => {
    
    console.log('Data inserted successfully');

    // Закрити з'єднання після виконання запиту
   

    
    
  })
  fs.writeFile(`${FolderFil}/${username}.txt`, '', (err, data) => {
    
  } )
  a++;
  console.log(a);
  // Відправити відповідь користувачу
  res.send(`Реєстрація успішна. Ім'я користувача: ${username}, Пароль: ${password}`);
  
});



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
server.connect( err => {
        if(err) {
          console.log(err);
          return err;
        }
        else {
          console.log("Database -----> ok")
        }
})


  
