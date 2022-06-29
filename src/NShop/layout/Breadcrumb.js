import React from 'react'
import { Breadcrumb } from 'semantic-ui-react'
import { useNavigate, Link } from "react-router-dom"
import '../assets/Breadcrumbs.css'


export default function Breadcrumbs({ paths, url }) {

    const navigate = useNavigate()
    return <div className='box-bread' >
        <Breadcrumb key={paths.length} >
            <Breadcrumb.Section as={Link} to='/' link >
                home
            </Breadcrumb.Section>
            {paths.map((path, i) => {
                return <span key={i}>

                    <Breadcrumb.Divider icon='right chevron' />
                    {i < paths.length - 1 ?
                        <Breadcrumb.Section
                            link
                            onClick={(e, data) => {
                                console.log(data.children);
                                if (data.link) {
                                    if (url) {
                                        navigate(`${url}`)
                                    } else {
                                        navigate(`/${data.children}/`)
                                    }

                                }
                            }}
                        >
                            {path}
                        </Breadcrumb.Section> :
                        <Breadcrumb.Section
                            active
                        >
                            {path}
                        </Breadcrumb.Section>

                    }



                </span>
            })}

        </Breadcrumb>
    </div>
}