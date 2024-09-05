import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import "../styles/style.css"

export default function Home() {
  return (
    <main class="dark">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={8}>
          <div className="header-logo">
            <img src="/images/logo.svg" alt="Logo" />
            <img src="/images/Studia.svg" alt="Studia" />
            <img src="/images/beta.svg" alt="Beta" />

          </div>
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={25}>
              <h1>Chapter Information</h1>

              <Card>
                <CardHeader>
                  <CardTitle>The Battle of The Atlantic (1941...</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>HIST 2307: Global Conflict Throughout History</CardDescription>
                  <CardDescription>Dr. James P. Whinston</CardDescription>
                </CardContent>
              </Card>

              Pipeline

              <Card>
                <CardContent>
                  <CardDescription>@frontera-beta/v090524</CardDescription>
                  <CardDescription>Latest frontera build. Main changes include improvements to personality, quality of output, and accuracy.</CardDescription>
                </CardContent>
              </Card>

              <h1>Having a problem? Report it here.</h1>

              <h3>Report a bug</h3>

              <div>
                <Input type="text" placeholder="Description" />
                <Button>Button</Button>
              </div>

            <h4>This will be sent directly to our team.</h4>

            </ResizablePanel>

            <ResizableHandle />

            <ResizablePanel>
              Two
            </ResizablePanel>

          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>

    </main>
  );
}
