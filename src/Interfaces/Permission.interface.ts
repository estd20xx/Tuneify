export interface Ipermission {
    askPermission: () => Promise<boolean>
}