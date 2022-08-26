import Catch from 'catch-decorator'

/**
 * Modified Catch decorator to catch all errors
 * 
 * @param Catch Original catch decorator
 */
export const CatchAll = Catch(Error, (err: any) => console.log(err.message))
