import 'react-native';
import { OfflineSongTypes } from './src/services/localMedia.service';
interface ApplicationCoreInterface {
    getMusicFiles(): Promise<Array<OfflineSongTypes>>
    getDeveloper(): Promise<string>
}
declare module 'react-native' {
    interface NativeModulesStatic {
        ApplicationCore: ApplicationCoreInterface;
    }
}