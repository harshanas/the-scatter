import react from 'react';
import dynamic from "next/dynamic";
import { useState, useEffect,} from 'react';
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

import MainLayout from '../../../layouts/mainLayout';
import "easymde/dist/easymde.min.css";

const SimpleMdeEditor = dynamic(
	() => import("react-simplemde-editor"),
	{ ssr: false }
);

const initialState = { title: '', content: '' }
const MySwal = withReactContent(Swal)

export default function NewStoryPage () {
    const [story, setStory] = useState(initialState);
    const [loaded, setLoaded] = useState(false);

    const router = useRouter();

    const { title, content } = story;
    const { authorId } = router.query;

    useEffect(() => {
        setTimeout(() => {
          setLoaded(true)
        }, 500)
      }, []);
    
    function onChange(e) {
        setStory(() => ({ ...story, [e.target.name]: e.target.value }))
    }

    function publishStory(){
        MySwal.fire({
          title: <p>Story Published Successfully</p>,
          
        });
    }
    
    return (
        <react.Fragment>
        <div className='row mt-3'>
            <div className="col-md-6 offset-md-3 col-12 text-justify">
                <input name='title' onChange={onChange} value={story.title} className="form-control form-control-lg text-center mb-2" type="text" placeholder="Story Title"/>
                <SimpleMdeEditor
                    className='mb-2'
                    value={story.content}
                    onChange={value => setStory({ ...story, content: value })}
                />
                <div className="d-grid gap-2">
                  <button className="btn btn-secondary" type="button" onClick={publishStory}>Publish Story</button>
                </div>
            </div>
            
        </div>
        
        </react.Fragment>
        
    );
}

NewStoryPage.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}