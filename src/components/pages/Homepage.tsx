import { ReactElement } from 'react';
import Button from "../parts/Button"

function Homepage(): ReactElement {

    let nameList = [{
        name:'Mathématiques',
        color:'bg-yellow-500'
    }, {
        name:'Français',
        color:'bg-blue-500'
    }, {
        name:'Dactylographie',
        color:'bg-slate-500'
    }, {
        name:'Langues étrangères',
        color:'bg-green-500'
    }]
    let buttonList = nameList.map(elt => <Button key={elt.name} title={elt.name} color={elt.color} />);

    return (
        <div className='w-2/3 flexJIC flex-col gap-6 sm:w-5/12 md:w-4/12 lg:w-3/12'>
            { buttonList }
        </div>
    )
}

export default Homepage