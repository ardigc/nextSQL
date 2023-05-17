'use client'

export function Product({name, description, price}: {name: string, description:string, price:number}) {
    // console.log(name, description)
    return <div>{name} - {description} -{price} €</div>
}