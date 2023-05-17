'use client'

export function Product({name, description}: {name: string, description:string}) {
    console.log(name, description)
    return <div>{name} - {description}</div>
}