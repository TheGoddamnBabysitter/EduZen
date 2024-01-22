const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
const https = require('https');

// Replace with your BulkSMSBD API credentials
const username = 'CodeEmpire';
const password = 'T6KKHVG6';
const apiKey  = 'xj0JpFmqYSZ02nAapFQW';
const senderId = '8809617614194';

let absents = []
let absentsName = []
let absentscodes = []
let presence = []





app.use(cors());
app.use(express.json())



const uri = "mongodb+srv://Tashrif:tashrif55@cluster1.o8vqz8p.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});





async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //presence sheet get
   
    const studentPresence = client.db("sciXIBanBoys").collection("A_Presence")
    const teachersId = client.db("sciXIBanBoys").collection("A_Presence")


  
    app.get("/students/:main_department/:standard/:version/:sec/:category", async(req, res)=>{
      const main_department = req.params.main_department;
      const standard = req.params.standard;
      const version = req.params.version;
      const category = req.params.category;
      const sec = req.params.sec;
      const studentsCullection = client.db(`${main_department}-${standard}-${version}-${category}`).collection(`${sec}`)

      const cursor = studentsCullection.find({})
      const result = await cursor.toArray()
      res.send(result);
  })
    app.get("/:main_department/:standard/:version/:sec/:category/:year/:month/:date", async(req, res)=>{
      const main_department = req.params.main_department;
      const standard = req.params.standard;
      const version = req.params.version;
      const category = req.params.category;
      const sec = req.params.sec;
      const year = req.params.year;
      const month = req.params.month;
      const date = req.params.date;

      const presenceCollection = client.db(`${main_department}-${standard}-${version}-${category}-presence`).collection(`${sec}`)

      // const cursor = presenceCollection.find({})
      // const result = await cursor.toArray()
      // res.send(result);


      const query = { "_id": {"id": `${date}-${month}-${year}`} }; // Example query to find a specific item

const item = await presenceCollection.findOne(query);

      console.log(item);
      res.send([item]);

     



  })
  app.post("/post_students", async (req, res) => {
    
    console.log("called");
    // console.log(req.body);
    const doc = req.body;
    console.log(doc);
    const student = doc.setStudents
    const main_department = doc.main_department;
      const standard = doc.cls;
      const version = doc.version;
      const category = doc.category;
      const sec = doc.form;
      
    const studentsCullection = client.db(`${main_department}-${standard}-${version}-${category}`).collection(`${sec}`)
    const result = await studentsCullection.insertOne(student);
    console.log(
        `A document was inserted with the _id: ${result.insertedId}`
    );
}
);
  app.post("/post_teachers", async (req, res) => {
    
    console.log("called");
    // console.log(req.body);
    const doc = req.body;
    console.log(doc);
    const teacher = doc.teacher
    const campus = doc.campus;
      const department = doc.department;
     const id = teacher._id.id
      
    const studentsCullection = client.db(`${department}-${campus}`).collection(`${id}`)
    const result = await studentsCullection.insertOne(teacher);
    console.log(
        `A document was inserted with the _id: ${result.insertedId}`
    );
}
);
  app.post("/delete_sheet", async (req, res) => {
    
    console.log("called");
    // console.log(req.body);
    const doc = req.body;

    console.log(doc);
    
    const main_department = doc.main_department;
    const standard = doc.standard;
    const version = doc.version;
    const category = doc.category;
    const sec = doc.form;
    const year = doc.year;
    const month = doc.month;
    const date = doc.date;

    const presenceCollection = client.db(`${main_department}-${standard}-${version}-${category}-presence`).collection(`${sec}`)

  


    // const query = { "_id": {"id": `${date}-${month}-${year}`} }; // Example query to find a specific item
    try {
      await presenceCollection.deleteOne(
        { "_id" :{"id": `${date}-${month}-${year}`}}
    );
      res.json({ message: 'Post deleted successfully',
    id: `${date}-${month}-${year}`
    });
    } catch (err) {
      console.error('Error deleting post:', err);
      res.status(500).json({ error: 'Failed to delete post' });
    }
})
  app.post("/delete_students", async (req, res) => {
    
    console.log("called");
    // console.log(req.body);
    const doc = req.body;
    console.log(doc);
    
    const main_department = doc.main_department;
      const standard = doc.cls;
      const version = doc.version;
      const category = doc.category;
      const sec = doc.form;
      const code = doc.code;
      
    const studentsCullection = client.db(`${main_department}-${standard}-${version}-${category}`).collection(`${sec}`)
    try {
      await studentsCullection.deleteOne(
        { "_id" : {id:`${code}`} }
    );
      res.json({ message: 'Post deleted successfully',
    code: code
    });
    } catch (err) {
      console.error('Error deleting post:', err);
      res.status(500).json({ error: 'Failed to delete post' });
    }
})
  app.post("/save-presenceSheet", async (req, res) => {
    
    const data = req.body
    const dataArrey = data.presenceSheet;
    const timeSet = data.timeSet;
    const main_department=  data.main_department
const standard= data.standard
const version=  data.version
const category=  data.category
const form=  data.form
const presenceData = {
  _id:{id: `${timeSet.formattedDate}-${timeSet.formatedMonth}-${timeSet.year}` },
  // _id:{id: `${"2"}-${timeSet.formatedMonth}-${timeSet.year}` },
  day : timeSet.formattedDay,
  dataArrey
}
    console.log(presenceData);
    const presenceCollection = client.db(`${main_department}-${standard}-${version}-${category}-presence`).collection(`${form}`)
  const result = await presenceCollection.insertOne(presenceData);
  console.log(
      `A document was inserted with the _id: ${result.insertedId}`
  );
}
);

    //activity
    app.get("/:dep/:campus/:id", async(req, res) => {
      const campus = req.params.campus;
    
      const dep = req.params.dep;
   
      const id = req.params.id;
     
      const teachersActivity = client.db(`${dep}-${campus}`).collection(`${id}_activity`)
      const teachersId = client.db(`${dep}-${campus}`).collection(`${id}`)
      
  
      const activity = teachersActivity.find({});
      const teachersInfo = teachersId.find({});
      const result1 = await activity.toArray()
      
      const result2 = await teachersInfo.toArray()
        
      if (result2.length === 0) {
        const combination = [[{"status":"no"}]]
       
        res.send(combination);
      }else{
        const combination =[[{"status":"yes"}],result2,result1]
        res.send(combination);
      }
     

      // const result = 
      
  });


  






    




  app.post('/send-sms', async (req, res) => {

      
    absents = []
    absentsName = []
    absentscodes = []
    presence = []

    const data = req.body
    const dataArrey = data.presenceSheet;
//     const timeSet = data.timeSet;
//     const main_department=  data.main_department
// const standard= data.standard
// const version=  data.version
// const category=  data.category
// const form=  data.form
// const presenceData = {
//   _id:{id: `${timeSet.formattedDate}-${timeSet.formatedMonth}-${timeSet.year}` },
//   day : timeSet.formattedDay,
//   dataArrey
// }
//     console.log(presenceData);
//     const presenceCollection = client.db(`${main_department}-${standard}-${version}-${category}-presence`).collection(`${form}`)
//   const result = await presenceCollection.insertOne(presenceData);
//   console.log(
//       `A document was inserted with the _id: ${result.insertedId}`
//   );
    for (const data of dataArrey) {
      if (data.presence === 'absent' || data.presence ==="late") {
        presence.push(data.presence)
        absents.push(data.phone)
        absentsName.push(data.name)
        absentscodes.push(data.code)
      }
      
    }


    try {
      // const { phoneNumbers, message } = req.body;
      const phoneNumberList = absents
     
  
      if (!phoneNumberList) {
        return res.status(400).send('Missing required fields');
      }
  
      // Split phone numbers by comma and trim whitespace
      // const phoneNumberList = phoneNumbers.split(',').map((number) => number.trim());
  
      const promises = [];
      for (const code of absentscodes) {
        
        const message = `your child ${absentsName[absentscodes.indexOf(code)]} is ${presence[absentscodes.indexOf(code)]} today in the class`

        const data = JSON.stringify({
          api_key: apiKey,
          senderid: senderId,
          number: absents[absentscodes.indexOf(code)],
          type: 'post',
          url: 'http://bulksmsbd.net/api/smsapi',
          message,
        });
  
        const options = {
          hostname: 'bulksmsbd.net',
          path: '/api/smsapi',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
          },
        };
  
        promises.push(new Promise((resolve, reject) => {
          const request = https.request(options, (response) => {
            let responseData = '';
            response.on('data', (chunk) => {
              responseData += chunk;
            });
  
            response.on('end', () => {
              const responseObj = JSON.parse(responseData);
              if (responseObj.status === 'success') {
                resolve({ success: true, message: `Sent message to ${absents[absentscodes.indexOf(code)]} with ID: ${responseObj.data.request_id}` });
              } else {
                resolve({ success: false, message: `Error sending message to ${absents[absentscodes.indexOf(code)]}: ${responseObj.error}` });
              }
            });
          });
  
          request.on('error', (error) => {
            reject(error);
          });
  
          request.write(data);
          request.end();
        }));
      }
  
      const results = await Promise.all(promises);
  
      res.send({ message: 'Bulk SMS sent successfully', results });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error sending bulk SMS');
    }
  });










    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error('Error saving post:', err);
    res.status(500).json({ error: 'Failed to save post' });
  }
}app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

run().catch(console.dir);



 
app.get("/", (req, res)=>{
    res.send("hello! I'm back!")
} );

app.listen(port, ()=>{
    console.log(`listenning to ${port}`);
})













