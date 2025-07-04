import Image from "next/image";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="App">
          <div className="flex justify-center p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>My Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p>This card uses Shadcn UI components.</p>
                <Button variant="default">Click Me</Button>
              </CardContent>
            </Card>
          </div>

        </div>

      </main>
    </div>
  );
}
