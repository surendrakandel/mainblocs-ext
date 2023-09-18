export enum actionType{
    downloadBlogPage,
    downloadComments,
    collectComments,
    collectBlogPage,
    refresh,
    delete,
}
export type commandType = {
    message: actionType,
}