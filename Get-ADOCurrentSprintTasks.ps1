$PAT = "xbryhimvzo6kalq22unulsnsqroy3z5lj3dxk3wlikgvfx4kio5a"
$B64Pat = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes(":$PAT"))
$B64Pat

Import-Module -Name Microsoft.PowerShell.Utility

# get current sprint
$headers = @{
  'Authorization' = "Basic $B64Pat"
}

# https://dev.azure.com/cunamutual/CXU/_apis/work/teamsettings/iterations?$timeframe=current&api-version=6.0
$CurrentSprintResponse = Invoke-RestMethod -Uri "https://dev.azure.com/cunamutual/CXU/_apis/work/teamsettings/iterations?`$timeframe=current&api-version=6.0" -Headers $headers
(Invoke-RestMethod -Uri "https://dev.azure.com/cunamutual/_apis/projects/69c3faaa-601b-4ecb-827b-41c157c51ca1/teams?`$mine=true&api-version=6.0" -Headers $headers).Value
$CurrentSprintResponse