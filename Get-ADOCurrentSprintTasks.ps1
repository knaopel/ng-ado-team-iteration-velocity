$PAT = "xbryhimvzo6kalq22unulsnsqroy3z5lj3dxk3wlikgvfx4kio5a"
$B64Pat = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes(":$PAT"))

Import-Module -Name Microsoft.PowerShell.Utility

# get current sprint
$headers = @{
  'Authorization' = "Basic $B64Pat"
}
$CurrentSprintResponse = Invoke-RestMethod -Uri "https://dev.azure.com/cunamutual/CXU/_apis/work/teamsettings/iterations?`$timeframe=current&api-version=6.0" -Headers $headers
$CurrentSprintResponse