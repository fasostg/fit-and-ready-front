import logo from '../../assets/logo-text.png';

export function Header() {
    return (
        <>
            <div className="w-2/5 flex justify-start items-start ml-48">
                <img src={logo} className='w-35 mr-4'></img>
            </div>
            <div className="w-3/5 flex justify-end items-end">
                
            </div>
        </>
    )
}