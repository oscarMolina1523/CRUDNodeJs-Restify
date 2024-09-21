import restify from 'restify';
const server= restify.createServer();

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

const PORT = process.env.PORT || 8080;
const applicationJson= 'application/json';

const users={
    1:{
        completeName: 'Juan Caldera',
        email: 'pollos200@gmail.com',
        password: '123456789'
    },
    2:{
        completeName: 'Rosendo Alvarado',
        email: 'bufalos3000@gmail.com',
        password: '12345678910'
    },

}

server.get('/user', (req, res, next) =>{
    res.setHeader('Content-Type', applicationJson);
    res.send(users);
    return next();
});

server.get('/user/:id', (req, res, next)=>{
    res.setHeader('Content-Type', applicationJson);
    const userId = parseInt(req.params.id); 
    
    if (users[userId]) {
        res.setHeader('Content-Type', applicationJson);
        res.send(users[userId]);
    } else {
        res.send(404, { message: 'Usuario no encontrado' });
    }

    return next();
});

server.post('/create', (req, res, next)=>{
    res.setHeader('Content-Type', applicationJson);
    const newUser= req.body;
    const newUserId = Object.keys(users).length + 1;
    users[newUserId] = newUser;
    res.send(201, { message: 'Usuario creado exitosamente', newUser });
    return next();
});

server.put('/update/:id', (req, res, next)=>{
    res.setHeader('Content-Type', applicationJson);
    const id= req.params.id;
    const data= req.body;
    if (users[id]) {

        users[id] = { ...users[id], ...data };
        res.send(200, { message: `Usuario con ID ${id} actualizado`, updatedUser: users[id] });
    } else {
        res.send(404, { message: 'Usuario no encontrado' });
    }

    return next();
});

server.del('/delete/:id', (req, res, next)=>{
    res.setHeader('Content-Type', applicationJson);
    const id= req.params.id;
    if (users[id]) {

        delete users[id];
        
        res.send(200, { message: `Usuario con ID ${id} eliminado` });
    } else {
        res.send(404, { message: 'Usuario no encontrado' });
    }

    return next();
});

server.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`);
});