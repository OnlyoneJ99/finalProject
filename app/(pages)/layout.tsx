import NavBar from "../components/navbar/navbar";

export default function NavbarLayout({children}:{children:React.ReactNode}){
    return(
        <>
            <NavBar />
            {children}
        </>
    )
}