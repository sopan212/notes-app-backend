const {
        addNoteHandler,
        getNotesAllHandler,
        getNotesById,
        editNotesByIdHandler,
        deleteNotesByIdHandler
    } = require('./handler');
const routes= [

    {
        method:'POST',
        path:'/notes',
        handler:addNoteHandler,
     },
     {
        method:'GET',
        path:'/notes',
        handler:getNotesAllHandler,
     },
     {
        method:'GET',
        path:'/notes/{id}',
        handler:getNotesById,
     },
     {
        method:'PUT',
        path:'/notes/{id}',
        handler:editNotesByIdHandler,
     },
     {
        method:'DELETE',
        path:'/notes/{id}',
        handler:deleteNotesByIdHandler,
     },

    ]

module.exports = routes;