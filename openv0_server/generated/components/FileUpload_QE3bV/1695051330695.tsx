import React, { useState } from 'react';
import { Cloudy } from "lucide-react"; // import appropriate icons 
import { Button } from "@/components/ui/button"; 
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

// This mock UI component doesn't upload file anywhere 

const FileUpload: React.FC = () => {
    const [ selectedFile, setSelectedFile ] = useState(null);
    const [ loaded, setLoaded ] = useState(0);

    const checkMimeType=(event)=>{
        //getting file object
        let file = event.target.files[0] 
        //define allow mime type
        const types = ['image/png', 'image/jpeg', 'image/gif']
        if (types.every(type => file.type !== type)) {
            alert(file.type+' is not a supported format\n'+
            'Supported formats: .png/.jpeg/.gif')
             return false;
        }
        return true;
    }

    const checkFileSize=(event)=>{
        let file = event.target.files[0]
        const size = 15000 //15KB
        if (file.size > size) {
            alert('Max size is ' + size/1000 + 'KB')
            return false
        } 
        return true;   
    }

    const handleSelectedFile = event => {
        if(checkMimeType(event) && checkFileSize(event)){ 
          setSelectedFile(event.target.files[0]);
          setLoaded(0)
        }
    }

    return (
        <div className="max-w-lg mx-auto py-10">
            <Alert>
                <Cloudy className="h-4 w-4 mr-2" />
                <AlertTitle>Upload file!</AlertTitle>
                <AlertDescription>
                    Please select a file to upload.
                </AlertDescription>
            </Alert>
            <div className="mt-6">
                <input 
                    type="file" 
                    onChange={handleSelectedFile} 
                />
                {selectedFile && (<span className="ml-3">{selectedFile.name}</span>)}
            </div>
            {loaded > 0 && 
                <div className="mt-3">
                    <Progress value={loaded} className="w-full" />
                </div>
            }        
            <div className="mt-6">
                <Button>Upload</Button>
            </div>
        </div>
    );
};

export default FileUpload;