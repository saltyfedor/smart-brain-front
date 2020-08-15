import React from 'react';
import './LinkForm.css';



const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return(  
        <div>
            <p className = 'f3'>
                {'Medium Chungus will detect faces for you'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='Text' onChange={onInputChange} />
                    <button 
                    
                        className='w-30 grow f4 link br2 dib white bg-light-purple'
                        onClick={onButtonSubmit}

                    >Detect!</button>
                </div>
            </div>
        </div>
      
    );
      
    
};

export default ImageLinkForm;
