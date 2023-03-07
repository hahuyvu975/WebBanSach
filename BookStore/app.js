const express = require('express');

const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views')

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errrorController = require('./controllers/error')

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const sequelize = require('./util/database');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errrorController.get404)

// product thuoc user, tham số thứ 2: khi xoá 1 user thì mọi sp bị xoá theo của user đó
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
User.hasMany(Product); 
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem })
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
    // .sync( {force: true})
    .sync( )
    .then(result => {
        return User.findByPk(1)

    })
    .then(user => {
        if (!user) {
            return User.create({ name: 'Huy Vu', email: 'hahuyvu975@gmail.com' })
        }
        return user;
    })
    .then(user => {
        return user.createCart();
        
    })
    .then(cart => {
        app.listen(7001);
    })
    .catch(err => {
        console.log(err);
    })


