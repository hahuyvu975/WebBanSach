const express = require('express');

const adminController = require('../controllers/admin')

const path = require('path');

const router = express.Router();

// /admin/add => GET
router.get('/add', adminController.getAddProduct );

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add => POST
router.post('/add', adminController.postAddProduct );

router.get('/edit-product/:productId', adminController.getEditProduct)

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
