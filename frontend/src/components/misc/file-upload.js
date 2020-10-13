import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Button from "@material-ui/core/Button";

export default function MyDropzone() {
    const onDrop = useCallback(acceptedFiles => {

    
    })
    multiple
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <Button variant="outlined">Upload Image</Button>
            }
        </div>
    )
}

/*
<Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)} multiple>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <Button variant="outlined">Upload Image</Button>
                    </div>
                  </section> //https://react-dropzone.js.org/ Has Material UI stuff
                )}
</Dropzone>
*/