import react from 'react';
import { useParams } from 'react-router';
import Notfound from '../pages/notFound';
import { useSelector } from 'react-redux'

function geneRatePage(pagename) {
    try {
        
        const S = require(`../pages/${pagename}`).default;

        return <S />
    }
    catch {
        return <Notfound />;
    }
}
function PageRender() {
    const { Auth } = useSelector(state => state);
    const { name, id } = useParams();
    let pagename = '';
    if (Auth.token) {
        if (id) {
            pagename = `${name}/[id]`;
        }
        else
            pagename = name;
    }

    return geneRatePage(pagename);

}
export default PageRender;