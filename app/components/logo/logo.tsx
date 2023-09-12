import Image from "next/image";
export default function Logo({ width,height}:{width:number,height:number}){
    return (
        <>
            <Image sizes="" src="/images/logo.svg" width={width} height={width} alt="site logo"/>
        </>
    )
}