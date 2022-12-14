
export class MessageStatus {
    private status: MessageShowStatus;

    constructor(){
        this.status = MessageShowStatus.HIDDEN;
    }

    public setStatus(status: MessageShowStatus){
        this.status = status;
    }

    public getStatus(): MessageShowStatus{
        return this.status;
    }

    public isStatus( status: MessageShowStatus) : boolean {
        return this.status == status;
    }

    public isHidden(): boolean {
        return this.isStatus(MessageShowStatus.HIDDEN) ;
    }
    public isSuccess(): boolean {
        return this.isStatus(MessageShowStatus.SUCCESS) ;
    }
    public isError(): boolean {
        return this.isStatus(MessageShowStatus.ERROR) ;
    }
    public isErrorForm(): boolean {
        return this.isStatus(MessageShowStatus.ERROR_FORM) ;
    }
    public isDeleting(): boolean {
        return this.isStatus(MessageShowStatus.ERROR_DELETING) ;
    }
    public isUpdating(): boolean {
        return this.isStatus(MessageShowStatus.ERROR_UPDATING) ;
    }
    public isForbidden(): boolean {
        return this.isStatus(MessageShowStatus.ERROR_FORBIDEN) ;
    }

}

export enum MessageShowStatus {
    HIDDEN          = "HIDDEN",
    SUCCESS         = "SUCCESS",
    ERROR           = "ERROR",
    ERROR_FORM      = "ERROR_FORM",
    ERROR_DELETING  = "ERROR_DELETING",
    ERROR_UPDATING  = "ERROR_UPDATING",
    ERROR_FORBIDEN  = "ERROR_FORBIDEN"
}