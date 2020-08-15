import React from 'react';
import 'tachyons'; 


const Rank = ({name, entries }) => {
    const curName = name;
    const curEntries = entries; 
    return(  
        <div>
           {`${curName} , your current entry count is...`}
            <div className='white f1 '>
                {curEntries}
            </div>
        </div>
      
    );
      
    
};

export default Rank;