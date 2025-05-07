import { div } from "framer-motion/client"
import AcceptsLayout from "./_layout"
import AcceptsForm from "./accept"
import { Suspense } from "react"



const Accepts = () => {

    return (
        <AcceptsLayout>
            <Suspense>
                <AcceptsForm />
            </Suspense>
        </AcceptsLayout>
    )
}


export default Accepts