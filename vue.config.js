module.exports ={
    // publicPath:'/miaomiao', 
    lintOnSave: false,
    devServer:{
        // disableHostCheck: true,
        proxy:{
            '/api':{
                target:'https://novel.kele8.cn/',
                 changeOrigin:true,
                //  ws: true,
                //  pathRewrite: {
                //    '^/api': ''
                //  }
            }
        }
    },
  }