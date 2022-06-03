import { FC } from 'react'
import { nameList } from '../helpers/dataHelpers'
import Button from '../parts/Button'

const Homepage: FC = () => {

    let buttonList = nameList.map(elt => <Button key={elt.title} title={elt.title} color={elt.color} />);

    return (
        <div className='w-2/3 flexJIC flex-col gap-6 sm:w-5/12 md:w-4/12 lg:w-3/12'>
            <span>Hello : </span>
            { buttonList }
        </div>
    )
}

export default Homepage