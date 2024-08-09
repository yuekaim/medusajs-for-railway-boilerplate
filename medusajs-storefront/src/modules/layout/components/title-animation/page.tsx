'use client'

import { TypeAnimation } from 'react-type-animation'

const TitleAnimation = () => {
    return (
    <div className='text-lg w-max bg-white'>
        g_sv is <TypeAnimation
            sequence={[
                'ground surveillance vehicle', 1000,
                'google street view', 1000,
                'global security and visibility', 1000,
                'graphic sensationalism videos', 1000,
                'global seed vault', 1000,
                'manification of social vulnerability', 1000,
                'group subversion and vendetta', 1000,
                'grand shadowy networks', 1000,
                // Types 'Three' without deleting 'Two'
                () => {
                console.log('Sequence completed');
                },
            ]}
            wrapper="span"
            cursor={false}
            repeat={Infinity}
            className='inline-block uppercase title-type'
        />
    </div> 
    );
  };

  export default TitleAnimation;
