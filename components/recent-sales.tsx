import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>AL</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Alex</p>
          <p className="text-xs text-gray-500 text-muted-foreground">
            MLG123456789
          </p>
        </div>
        <div className="ml-auto font-medium">August 9,2024</div> 
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>SU</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Suresh </p> 
          <p className="text-xs text-muted-foreground">
            MLG102122220
          </p>
        </div>
        <div className="ml-auto font-medium">August 10,2024</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>RJ</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Raju </p>
          <p className="text-xs text-muted-foreground">
            MLG189552222
          </p>
        </div>
        <div className="ml-auto font-medium">August 13,2024</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>MK</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Marry Kim</p>
          <p className="text-xs text-muted-foreground">
            MLG196333333
          </p>
        </div>
        <div className="ml-auto font-medium">August 16,2024</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Sofia Davis</p>
          <p className="text-xs  text-muted-foreground">
            MLG1056233333
          </p>
        </div>
        <div className="ml-auto font-medium">August 22,2024</div>
      </div>
    </div>
  );
}
