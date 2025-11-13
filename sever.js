require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const chatRoutes = require('./routes/chat');
const callsRoutes = require('./routes/calls');
const paymentsRoutes = require('./routes/payments');

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/calls', callsRoutes);
app.use('/api/payments', paymentsRoutes);

// Socket.IO setup
const server = http.createServer(app);
const io = new Server(server, { cors: { origin:"*" } });

io.on('connection', socket=>{
    console.log('User connected:', socket.id);

    socket.on('sendMessage', data => io.emit('receiveMessage', data));
    socket.on('notify', data => io.emit('receiveNotification', data));
    socket.on('callUser', data => io.to(data.to).emit('callIncoming', data));
    socket.on('answerCall', data => io.to(data.to).emit('callAnswered', data));

    socket.on('disconnect', ()=>console.log('User disconnected:', socket.id));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));
