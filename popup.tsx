import "./style.css"
import { Card, CardContent, CardHeader, CardTitle } from "~components/card"
import { Button } from "~components/button"

function ImageIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  )
}

function AppWindowIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M10 4v4" />
      <path d="M2 8h20" />
      <path d="M6 4v4" />
    </svg>
  )
}

function IndexPopup() {
  return (
      <Card className="p-4">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Capture</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-6">
          <Button className="w-full" variant="outline">
            <ImageIcon className="w-4 h-4 mr-2" />
            Capture Screen
          </Button>
          <Button className="w-full" variant="outline">
            <AppWindowIcon className="w-4 h-4 mr-2" />
            Capture Window
          </Button>
        </CardContent>
      </Card>
  )
}

export default IndexPopup
