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
          <div className="header-logo elements">
            <img src="/images/logo.svg" alt="Logo" />
            <img src="/images/Studia.svg" alt="Studia" />
            <img src="/images/beta.svg" alt="Beta" />

          </div>
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={25}>
              <div className="elements container">
                <div class="top">
                  <h2 className="headers">Chapter Information</h2>

                  <Card className="card">
                    <CardHeader>
                      <div className="courseTitle">
                        <img src="/images/ellipse.svg" class="courseTitle-ellipse"/>
                        <CardTitle>The Battle of The Atlantic (1941...</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>HIST 2307: Global Conflict Throughout History</CardDescription>
                      <CardDescription>Dr. James P. Whinston</CardDescription>
                    </CardContent>
                  </Card>

                  <h2 className="headers">Pipeline</h2>

                  <Card className="card">
                    <CardHeader>
                      <CardTitle>@frontera-beta/v090524</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <h5 className="gray-text">Latest frontera build. Main changes include improvements to personality, quality of output, and accuracy.</h5>
                    </CardContent>
                  </Card>
                </div>

                <div className="bottom">
                  <h1>Having a problem? Report it here.</h1>

                  <h5>Report a bug</h5>

                  <div className="report-button">
                    <Input type="text" placeholder="Description"/>
                    <Button>Send</Button>
                  </div>

                  <h6>This will be sent directly to our team.</h6>
                </div>
                
              </div>

            </ResizablePanel>

            <ResizableHandle />

            <ResizablePanel>
              <div className="elements">
                      
              </div>
            </ResizablePanel>

          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>

    </main>
  );
}
