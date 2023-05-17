'use client'

export function Product({name, description, price}: {name: string, description:string, price:number}) {
    
    return <div className="border border-slate-400">
        <div className="flex justify-center">
        {name}
        </div>
        <div className="flex justify-center items-center">
        {description}
        </div>
        <div className="flex justify-end items-center">
{price} €
</div>
        </div>
}