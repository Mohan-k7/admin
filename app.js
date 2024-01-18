const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const { requireAuth } = require('./middleware/auth');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));


// Connect to Mongyour-mongodb-urioDB (replace 'your-mongodb-uri' with your actual MongoDB URI)
mongoose.connect("mongodb+srv://mohan:mohan@cluster0.yvc1agc.mongodb.net/FullstDB?retryWrites=true&w=majority",{
       useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(db => console.log('DB is connected'))
.catch(err => console.log(err));


// Middleware for parsing incoming request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use the session middleware with MongoDBStore
const store = new MongoDBStore({
  uri: "mongodb+srv://mohan:mohan@cluster0.yvc1agc.mongodb.net/FullstDB?retryWrites=true&w=majority",
  collection: 'sessions',
});

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour
}));

// Set view engine (if using templates, e.g., EJS)
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Routes
app.use('/admin', adminRoutes);
app.use('/user', requireAuth, userRoutes); // Protect user routes with authentication middleware

// Sample route for testing
app.get('/', (req, res) => {
  res.send('Hello, this is your Express app!');
});
app.get("/login",(req,res)=>{
  res.render("login");
});
// Listen on a port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

