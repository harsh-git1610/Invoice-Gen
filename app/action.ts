"Use server"

import { requireUser } from "./utils/hooks"

export async function OnboardingUser() {
    const session = await requireUser
    
}
