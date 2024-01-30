const cloudinary = require('cloudinary').v2


exports.uploadToCloudinary =  async ( file , folder , height , quality ) => { 
    try { 
        let options = { 
            folder : folder || "default_folder"
        }
        if(height) { 
            options.height = height; 
        }if(quality) { 
            options.quality = quality
        }
        const result  = await cloudinary.uploader.upload(file, options)
        return result.url; 
    }catch(err) { 
       console.error("error uploading to cloudinary" , err.message)
       throw err
    }
}


