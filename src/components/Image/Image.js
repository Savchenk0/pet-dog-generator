import React from "react";
import '../../pages/PhotoGenerator/PhotoGeneratorPage.scss';
import PropTypes from 'prop-types'


function Image(props){   
    const {source,className,wrapperClassName} = props
    return(
    <div className={wrapperClassName}>
        <img className={className} src={source? source :'./loading.png'} />
       </div>
    )

}


export default Image