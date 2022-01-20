//to Save Notes
const {nanoid} = require('nanoid');
const notes = require('./notes');
const addNoteHandler = (request, h) => {
    const {title,tags,body} = request.payload;

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        title,tags,body,id,createdAt,updatedAt
    };

    notes.push(newNote);

    const isSuccsess = notes.filter((note)=> note.id === id).length > 0;

    if (isSuccsess){
        const response = h.response({
            status:'success',
            message:'Catatan Berhasil di tambahkan',
            data:{
                noteId:id,
            },
        })
        response.code(201);
        return response;
    }
    
    const response = h.response({
        status:'fail',
        message:'Catatan Gagal Di Tambahkan',
    })
    response.code(500);
    return response;
};

//To Show Notes
const getNotesAllHandler = () =>({
    status:'success',
    data:{
        notes,
    }
});


//to Get Notes By id

const getNotesById = (request, h)=>{

    const {id} = request.params;

    const note = notes.filter((n)=> n.id === id)[0];



    if(note !== undefined){
        return{
            status:'success',
            data:{
                note,
            },
        }
    }
    
    const response = h.response({
        status:'fail',
        message:'catatan tidak di temukan'
    });
    response.code(404);
    return response;
}

//to edit note by id

const editNotesByIdHandler = (request, h) =>{

    const {id} = request.params;

    const {title,tags,body} = request.payload;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((note)=> note.id === id);
    console.log(index);
    if(index !== -1){
        notes[index]={
            ...notes[index],
            title,
            tags,
            body,
            updatedAt
        };
     
    const response = h.response({
        status:'success',
        message:'catatan berhasil perbaharui'
    
    })
    response.code(200);
    return response;

        }

    const response = h.response({
        status:'fail',
        message:'gagal merubah catatan'
    })

    response.code(404);
    return response;
    
    };


//to delete notes by Id

const deleteNotesByIdHandler =(request,h)=>{
    const {id} = request.params;

    const index = notes.findIndex((not)=>not.id === id);

    if(index !== -1){
        notes.splice(index,1);

        const response = h.response({
            status:'success',
            message:'catatan berhasil di hapus'
        })
        response.code(200);
        return response;
    }

    const response = h.response({
        status:'fail',
        message:'catatan gagal di hapus'
    })
    response.code(404);
    return response;
}



module.exports = {addNoteHandler,
                getNotesAllHandler,
                getNotesById,
                editNotesByIdHandler,
                deleteNotesByIdHandler
};