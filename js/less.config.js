//为Table 添加样式
//$('.cv table').addClass('table table-hover');

// $(document).ready(function(){
//     $('.wiki a').each(function(){
//         $(this).attr('target','_blank');   
//     });  
// });
less = {
    env: "development", // or "production ,development"
    async: false,       // load imports async
    fileAsync: false,   // load imports async when in a page under
                        // a file protocol
    poll: 1000,         // when in watch mode, time in ms between polls
    functions: {},      // user functions, keyed by name
    dumpLineNumbers: "all", // or "mediaQuery" or "all"
    relativeUrls: false,// whether to adjust url's to be relative
                        // if false, url's are already relative to the
                        // entry less file
    rootpath: ":/a.com/"// a path to add on to the start of every url
                        //resource
};