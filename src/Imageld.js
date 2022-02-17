import React,{useState} from 'react';
import imageCompression from 'browser-image-compression';
import './index.css';




const Imageld = () => {
    const[originalimg ,Setoriginalimg]=useState("");
    const[orgimgfile,Setorgimgfile]=useState("");
    const[compresedimg,Setcompresdimg]=useState('');
    const[filename,Setfilename]=useState('');
    const handle=(e)=>
    {
        const imageFile=e.target.files[0];
        Setoriginalimg(imageFile);
        Setorgimgfile(URL.createObjectURL(imageFile));
        Setfilename(imageFile.name);
    }
    const compresshandle=(e)=>
    {
       e.preventDefault();
       const options=
       {
         maxSizeMB:1,maxwidthandheight:500,useWebwork:true
       }
       if(options.maxSizeMB>=originalimg/1024)
       {
          alert("image is too small to compressed");
       }
       let output;
       imageCompression(originalimg,options).then((x)=>{output=x;
        const downloading=URL.createObjectURL(output);
        Setcompresdimg(downloading);

       })
    }
  return <>
  <section className='container imgsec'>
    <h1 className='mt-5 text-center'>Compress Your Image</h1>
    <div className='gridsec mt-5 text-center'>
        <div className="container">
            <div className="row mt-5">
                <div className="col-12 col-xl-4 text-center">
                  
                    {
                      orgimgfile?(<img src={orgimgfile} width="250" height="250" />):(        
                      <img className='' src='./img/download.jpg' alt='empty image'/>
                      )
                    }
        
                 <input  onChange={(e)=>handle(e)} className='mt-5 text-center'  type="file" accept='image/*'/> 
            </div>
            {/* ****************************2nd section************************ */}
    <div className="col-12 col-xl-4">
    {orgimgfile && <button type="button" onClick={(e)=>compresshandle(e)} className="btn btn-warning">Compress</button>}

                    

    </div>
    {/* .............................3rd sec......................... */}
    <div className="col-12 col-xl-4">
    {
                      compresedimg?(<img src={compresedimg} width="250" height="250" />):(        
                      <img className='' src='./img/download.jpg' alt='empty image'/>
                      )
                    }   
    {compresedimg && <button type="button" className="down mt-5 btn btn-danger"><a href={compresedimg}
     download={filename} >{" "}Download</a></button>}

    </div> 
  </div>
</div>

    </div>

    


  </section>

  </>;
};

export default Imageld;
